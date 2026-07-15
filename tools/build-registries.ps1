# =============================================================================
# build-registries.ps1
# Parses the 59 Precalculus Odyssey Question Bible phase files into browser-ready
# JS data registries (classic-script globals). No runtime Markdown parsing.
# Pure PowerShell. Extracts from the per-template FIELD LINES (consistent across
# all phases), not the Metadata JSON (whose format varies between phases).
#
#   Run:  powershell -ExecutionPolicy Bypass -File tools/build-registries.ps1
# =============================================================================
$ErrorActionPreference = 'Stop'

$root   = if ($PSScriptRoot) { Split-Path $PSScriptRoot -Parent } else { (Get-Location).Path }
$phases = Join-Path $root 'Precalculus_Odyssey_Bible_v5_Codex_Package\phases'
$outDir = Join-Path $root 'game\config\generated'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$CURRICULUM_VERSION = 'v5-59phases'

# ---- Arena grouping (coherent topic clusters, 1-4 phases, prereq chain) ----
$ARENAS = @(
  @{ id='arena_lin_solve';          title='Solving Linear Equations';            phases=@('P001','P002','P003') }
  @{ id='arena_lin_apply';          title='Rearranging & Modeling';              phases=@('P004','P005') }
  @{ id='arena_equation_battle';    title='Equation Battle Mastery';             phases=@('P006') }
  @{ id='arena_inequalities';       title='Inequalities';                        phases=@('P007','P008') }
  @{ id='arena_absolute_value';     title='Absolute Value';                      phases=@('P009','P010') }
  @{ id='arena_systems';            title='Systems of Equations';                phases=@('P011','P012','P013') }
  @{ id='arena_functions_core';     title='Functions: Notation, Domain & Range'; phases=@('P014','P015','P016','P017') }
  @{ id='arena_functions_transform';title='Transformations & Composition';       phases=@('P018','P019') }
  @{ id='arena_functions_inverse';  title='Inverse & Piecewise Functions';       phases=@('P020','P021') }
  @{ id='arena_quadratics_solve';   title='Quadratics: Factoring to Formula';    phases=@('P022','P023','P024') }
  @{ id='arena_quadratics_analyze'; title='Discriminant, Graphs & Modeling';     phases=@('P025','P026','P027') }
  @{ id='arena_polynomials';        title='Polynomials: Behavior & Division';    phases=@('P028','P029','P030') }
  @{ id='arena_poly_theorems';      title='Remainder & Factor Theorems';         phases=@('P031','P032') }
  @{ id='arena_rationals';          title='Rational Expressions';                phases=@('P033','P034','P035') }
  @{ id='arena_exponentials';       title='Exponentials & Compound Interest';    phases=@('P036','P037','P038') }
  @{ id='arena_logarithms';         title='Logarithms';                          phases=@('P039','P040','P041') }
  @{ id='arena_trig_angles';        title='Angles & the Unit Circle';            phases=@('P042','P043','P044') }
  @{ id='arena_trig_values';        title='Exact Values & Trig Graphs';          phases=@('P045','P046') }
  @{ id='arena_trig_transform';     title='Amplitude, Period & Shifts';          phases=@('P047','P048') }
  @{ id='arena_trig_identities';    title='Identities & Trig Equations';         phases=@('P049','P050') }
  @{ id='arena_trig_triangles';     title='Laws of Sines & Cosines';             phases=@('P051','P052') }
  @{ id='arena_sequences_series';   title='Sequences & Series';                  phases=@('P053','P054') }
  @{ id='arena_conics';             title='Conic Sections';                      phases=@('P055') }
  @{ id='arena_vectors_complex';    title='Vectors & Complex Numbers';           phases=@('P056','P057') }
  @{ id='arena_mastery';            title='Mixed Review & Final Boss';           phases=@('P058','P059') }
)

# ---- helpers ----------------------------------------------------------------
function Get-Field($blockLines, $name) {
  $re = '^-\s+' + [regex]::Escape($name) + ':\s*(.*)$'
  foreach ($l in $blockLines) { if ($l -match $re) { return $Matches[1].Trim() } }
  return $null
}
function Strip-Ticks($s) { if ($null -eq $s) { return $null } return ($s -replace '`', '').Trim() }
function Split-Distractors($s) {
  if ([string]::IsNullOrWhiteSpace($s)) { return @() }
  return @($s -split '\s*;\s*' | ForEach-Object { Strip-Ticks $_ } | Where-Object { $_ -ne '' })
}
function First-Token($s, $prefix) {
  if ($s -and ($s -match ('(' + $prefix + '[A-Za-z0-9\-_]+)'))) { return $Matches[1] }
  return $null
}
function Bool-Field($blk, $name) { $v = Get-Field $blk $name; return ($v -and ($v -match 'true')) }
function Section-Index($lines, $pattern) {
  for ($i=0; $i -lt $lines.Count; $i++) { if ($lines[$i] -match $pattern) { return $i } }
  return -1
}
# split lines[a..b] into blocks starting at each line matching $headerPattern
function Split-Blocks($lines, $a, $b, $headerPattern) {
  $blocks = New-Object System.Collections.ArrayList
  $start = -1
  for ($i=$a; $i -lt $b; $i++) {
    if ($lines[$i] -match $headerPattern) {
      if ($start -ge 0) { [void]$blocks.Add($lines[$start..($i-1)]) }
      $start = $i
    }
  }
  if ($start -ge 0 -and $start -lt $b) { [void]$blocks.Add($lines[$start..($b-1)]) }
  return $blocks
}
# ## Section -> text map for lines[a..b]
function Section-Map($lines, $a, $b) {
  $map = [ordered]@{}; $sec = $null; $buf = New-Object System.Collections.ArrayList
  for ($i=$a; $i -lt $b; $i++) {
    $l = $lines[$i]
    if ($l -match '^##\s+(.+?)\s*$') {
      if ($sec) { $map[$sec] = (($buf -join "`n").Trim()) }
      $sec = $Matches[1].Trim(); $buf = New-Object System.Collections.ArrayList
    } elseif ($sec) { [void]$buf.Add($l) }
  }
  if ($sec) { $map[$sec] = (($buf -join "`n").Trim()) }
  return $map
}

# ---- registries -------------------------------------------------------------
$QT   = [ordered]@{}; $HINT = [ordered]@{}; $TUT = [ordered]@{}; $SOC = [ordered]@{}
$MIS  = [ordered]@{}; $PHASE_TITLES = [ordered]@{}
$issues = New-Object System.Collections.ArrayList

function Add-Misconception($tag, $phaseId) {
  if ([string]::IsNullOrWhiteSpace($tag)) { return }
  $tag = $tag.Trim()
  if (-not $MIS.Contains($tag)) {
    $label = (Get-Culture).TextInfo.ToTitleCase(($tag -replace '_',' '))
    $MIS[$tag] = [ordered]@{ label=$label; count=0; phases=@() }
  }
  $MIS[$tag].count++
  if ($MIS[$tag].phases -notcontains $phaseId) { $MIS[$tag].phases += $phaseId }
}

$files = Get-ChildItem -Path $phases -Filter 'phase_*.md' | Sort-Object Name
Write-Host ("Parsing {0} phase files..." -f $files.Count)

foreach ($file in $files) {
  $lines  = Get-Content -LiteralPath $file.FullName -Encoding UTF8
  $pnum   = [int]($file.Name -replace '^phase_0*(\d+)_.*$','$1')
  $phaseId = 'P{0:D3}' -f $pnum

  $iP1 = Section-Index $lines '^#\s+Part I\b'
  $iP2 = Section-Index $lines '^#\s+Part II\b'
  $iP3 = Section-Index $lines '^#\s+Part III\b'
  $iP4 = Section-Index $lines '^#\s+Part IV\b'
  $iKG = Section-Index $lines '^#\s+Knowledge Graph\b'
  if ($iKG -lt 0) { $iKG = $lines.Count }
  if ($iP1 -lt 0 -or $iP2 -lt 0) { [void]$issues.Add("${phaseId}: missing Part I/II boundary"); continue }

  $header = $lines[0..([Math]::Max(0,$iP1-1))]
  $topic  = Get-Field $header 'Topic'
  $PHASE_TITLES[$phaseId] = if ($topic) { $topic } else { $phaseId }

  # ---- Part I templates (field-line extraction) ----
  $tblocks = Split-Blocks $lines ($iP1+1) $iP2 '^##\s+Template\b'
  $phaseTemplates = New-Object System.Collections.ArrayList
  foreach ($blk in $tblocks) {
    $tid = Strip-Ticks (Get-Field $blk 'Template ID')
    if (-not $tid) { continue }
    $diff = 3; $dRaw = Get-Field $blk 'Difficulty'; if ($dRaw -and ($dRaw -match '(\d+)')) { $diff = [int]$Matches[1] }
    $hintId = First-Token (Get-Field $blk 'Hint Mapping') 'H-'
    $tutId  = First-Token (Get-Field $blk 'Tutorial Mapping') 'Tut-'; if (-not $tutId) { $tutId = "Tut-$phaseId" }
    $socId  = First-Token (Get-Field $blk 'Socratic Mapping') 'Soc-'; if (-not $socId) { $socId = "Soc-$phaseId" }
    $mtags = @()
    $metaRaw = Get-Field $blk 'Metadata'
    if ($metaRaw -and ($metaRaw -match 'misconception_tags\s*[=:]\s*\[([^\]]*)\]')) {
      $mtags = @($Matches[1] -split '\s*,\s*' | ForEach-Object { ($_ -replace '["`]','').Trim() } | Where-Object { $_ })
    }
    $t = [ordered]@{
      templateId   = $tid
      phaseId      = $phaseId
      questionType = Strip-Ticks (Get-Field $blk 'Question Type')
      cognitiveSkill = Strip-Ticks (Get-Field $blk 'Cognitive Skill')
      difficulty   = $diff
      visualRequired = (Bool-Field $blk 'Visual Required')
      equationBattleCompatible = (Bool-Field $blk 'Equation Battle Compatible')
      bossCompatible = (Bool-Field $blk 'Boss Compatible')
      hintSequenceId = $hintId
      tutorialId   = $tutId
      socraticId   = $socId
      misconceptionTags = $mtags
      example      = Strip-Ticks (Get-Field $blk 'Example Question')
      answer       = Strip-Ticks (Get-Field $blk 'Answer')
      explanation  = Strip-Ticks (Get-Field $blk 'Explanation')
      distractors  = Split-Distractors (Get-Field $blk 'Distractors')
      modeling     = Strip-Ticks (Get-Field $blk 'Modeling Variant')
      reverse      = Strip-Ticks (Get-Field $blk 'Reverse Variant')
      graphVariant = Strip-Ticks (Get-Field $blk 'Graph/Visual Variant')
    }
    if (-not $t.example) { [void]$issues.Add(("{0}: no Example Question" -f $tid)) }
    if (-not $t.answer)  { [void]$issues.Add(("{0}: no Answer" -f $tid)) }
    if ($t.distractors.Count -lt 2) { [void]$issues.Add(("{0}: fewer than 2 distractors" -f $tid)) }
    if ($t.distractors -contains $t.answer) { [void]$issues.Add(("{0}: a distractor equals the answer" -f $tid)) }
    foreach ($mt in $t.misconceptionTags) { Add-Misconception $mt $phaseId }
    [void]$phaseTemplates.Add($t)
  }
  $QT[$phaseId] = @($phaseTemplates)
  if ($phaseTemplates.Count -ne 20) { [void]$issues.Add(("{0}: expected 20 templates, got {1}" -f $phaseId, $phaseTemplates.Count)) }

  # ---- Part II hints (## H-... then 6 '- Hint N - Label: text') ----
  $hid = $null; $cur = $null
  for ($i=$iP2+1; $i -lt $iP3; $i++) {
    $l = $lines[$i]
    if ($l -match '^##\s+(H-\S+)') {
      if ($hid -and $cur) { $HINT[$hid] = @($cur) }
      $hid = ($Matches[1] -replace '[`.,;]',''); $cur = New-Object object[] 6
    } elseif ($hid -and ($l -match '^-\s+Hint\s+(\d)\s+-\s+[^:]+:\s*(.*)$')) {
      $nn = [int]$Matches[1]; if ($nn -ge 1 -and $nn -le 6) { $cur[$nn-1] = (Strip-Ticks $Matches[2]) }
    }
  }
  if ($hid -and $cur) { $HINT[$hid] = @($cur) }

  # ---- Part III tutorial / Part IV socratic (## Section -> text) ----
  if ($iP3 -ge 0) {
    $tmap = Section-Map $lines ($iP3+1) $(if ($iP4 -ge 0) { $iP4 } else { $iKG })
    $tmap['tutorialId'] = "Tut-$phaseId"; $tmap['phaseId'] = $phaseId; $tmap['title'] = $PHASE_TITLES[$phaseId]
    $TUT["Tut-$phaseId"] = $tmap
    if ($tmap.Keys.Count -le 3) { [void]$issues.Add("${phaseId}: tutorial has no sections") }
  } else { [void]$issues.Add("${phaseId}: no Part III (tutorial)") }
  if ($iP4 -ge 0) {
    $smap = Section-Map $lines ($iP4+1) $iKG
    $smap['socraticId'] = "Soc-$phaseId"; $smap['phaseId'] = $phaseId
    $SOC["Soc-$phaseId"] = $smap
    if ($smap.Keys.Count -le 2) { [void]$issues.Add("${phaseId}: socratic has no sections") }
  } else { [void]$issues.Add("${phaseId}: no Part IV (socratic)") }
}

# ---- cross-reference validation ----
foreach ($ph in $QT.Keys) {
  foreach ($t in $QT[$ph]) {
    if ($t.hintSequenceId -and -not $HINT.Contains($t.hintSequenceId)) { [void]$issues.Add(("{0}: hint id {1} not found" -f $t.templateId, $t.hintSequenceId)) }
    elseif ($t.hintSequenceId) { $h = $HINT[$t.hintSequenceId]; if ($h.Count -ne 6 -or ($h | Where-Object { [string]::IsNullOrWhiteSpace($_) })) { [void]$issues.Add(("{0}: not 6 non-empty hint levels" -f $t.hintSequenceId)) } }
  }
}

# ---- arena registry + curriculum index + prereq graph ----
$ARENA_REG = [ordered]@{}; $arenaOrder = @(); $phaseToArena = @{}; $prev = $null; $n = 0
foreach ($a in $ARENAS) {
  $n++; $arenaOrder += $a.id
  foreach ($p in $a.phases) { $phaseToArena[$p] = $a.id }
  $ARENA_REG[$a.id] = [ordered]@{
    displayNumber = $n; title = $a.title; phaseIds = @($a.phases)
    prerequisiteArenaIds = if ($prev) { @($prev) } else { @() }
    tutorialIds = @($a.phases | ForEach-Object { 'Tut-' + $_ })
    bossPhaseId = $a.phases[-1]
    skin = [ordered]@{ region=''; bodyRefs=@() }
  }
  $prev = $a.id
}
$phaseOrder = @(1..59 | ForEach-Object { 'P{0:D3}' -f $_ })

$oldRanges = @(
  @{lo=1;hi=46;p='P001'}, @{lo=47;hi=54;p='P006'}, @{lo=55;hi=61;p='P007'}, @{lo=62;hi=68;p='P011'},
  @{lo=69;hi=90;p='P022'}, @{lo=91;hi=111;p='P024'}, @{lo=112;hi=133;p='P014'}, @{lo=134;hi=144;p='P053'},
  @{lo=145;hi=154;p='P039'}, @{lo=155;hi=166;p='P042'}, @{lo=167;hi=176;p='P055'}, @{lo=177;hi=187;p='P059'}
)
$oldLevelToPhase = [ordered]@{}; $oldLevelToArena = [ordered]@{}
for ($lv=1; $lv -le 187; $lv++) {
  $p = 'P001'; foreach ($r in $oldRanges) { if ($lv -ge $r.lo -and $lv -le $r.hi) { $p = $r.p; break } }
  $oldLevelToPhase["$lv"] = $p; $oldLevelToArena["$lv"] = $phaseToArena[$p]
}

$CI = [ordered]@{
  version = $CURRICULUM_VERSION; arenaCount = $ARENAS.Count; phaseCount = 59
  arenaOrder = $arenaOrder; phaseOrder = $phaseOrder; phaseTitles = $PHASE_TITLES
  phaseToArena = $phaseToArena; contentBoundaryPhase = 'P059'
  oldLevelToPhase = $oldLevelToPhase; oldLevelToArena = $oldLevelToArena
}
$PREREQ = [ordered]@{ arenas=[ordered]@{}; phases=[ordered]@{} }
foreach ($a in $ARENAS) { $PREREQ.arenas[$a.id] = $ARENA_REG[$a.id].prerequisiteArenaIds }
for ($i=0; $i -lt $phaseOrder.Count; $i++) { $PREREQ.phases[$phaseOrder[$i]] = if ($i -gt 0) { @($phaseOrder[$i-1]) } else { @() } }

# ---- emit ----
function Write-Registry($name, $obj) {
  $json = $obj | ConvertTo-Json -Depth 30 -Compress
  $js = "var $name = $json;`nif (typeof window !== 'undefined') window.$name = $name;`n"
  $path = Join-Path $outDir ((($name -replace '_','-').ToLower()) + '.js')
  [System.IO.File]::WriteAllText($path, $js, (New-Object System.Text.UTF8Encoding($false)))
  Write-Host ("  wrote {0}  ({1:N0} KB)" -f (Split-Path $path -Leaf), ((Get-Item $path).Length/1KB))
}
Write-Host "Emitting registries..."
Write-Registry 'CURRICULUM_INDEX'       $CI
Write-Registry 'ARENA_REGISTRY'         $ARENA_REG
Write-Registry 'QUESTION_TEMPLATES'     $QT
Write-Registry 'HINT_REGISTRY'          $HINT
Write-Registry 'TUTORIAL_REGISTRY'      $TUT
Write-Registry 'SOCRATIC_REGISTRY'      $SOC
Write-Registry 'MISCONCEPTION_REGISTRY' $MIS
Write-Registry 'PREREQ_GRAPH'           $PREREQ

# ---- report ----
$totalTemplates = ($QT.Keys | ForEach-Object { $QT[$_].Count } | Measure-Object -Sum).Sum
Write-Host ""
Write-Host "==================== COVERAGE ===================="
Write-Host ("Phases parsed:        {0}" -f $QT.Count)
Write-Host ("Arenas:               {0}" -f $ARENAS.Count)
Write-Host ("Question templates:   {0}" -f $totalTemplates)
Write-Host ("Hint sequences:       {0}" -f $HINT.Count)
Write-Host ("Tutorials:            {0}" -f $TUT.Count)
Write-Host ("Socratic dialogues:   {0}" -f $SOC.Count)
Write-Host ("Misconception tags:   {0}" -f $MIS.Count)
Write-Host "=================================================="
if ($issues.Count -gt 0) {
  Write-Host ("VALIDATION ISSUES: {0}" -f $issues.Count) -ForegroundColor Yellow
  $issues | Select-Object -First 30 | ForEach-Object { Write-Host ("  - {0}" -f $_) -ForegroundColor Yellow }
  if ($issues.Count -gt 30) { Write-Host ("  ... and {0} more" -f ($issues.Count-30)) -ForegroundColor Yellow }
} else { Write-Host "VALIDATION: clean [OK]" -ForegroundColor Green }
