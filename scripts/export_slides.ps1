param()

$ErrorActionPreference = "Stop"

$decks = @(
  @{ Path = "C:\Users\dhyey\OneDrive\Desktop\FinalNBs\PPTFINAL\MODULE1_ Learn to Drive.pptx"; Out = "C:\xLab\assets\slides\module1-learn-to-drive" },
  @{ Path = "C:\Users\dhyey\OneDrive\Desktop\FinalNBs\PPTFINAL\MODULE2_ Learn to Race.pptx"; Out = "C:\xLab\assets\slides\module2-learn-to-race" },
  @{ Path = "C:\Users\dhyey\OneDrive\Desktop\FinalNBs\PPTFINAL\MODULE2.1_ Static Obstacle Avoidance.pptx"; Out = "C:\xLab\assets\slides\module2-static-obstacle-avoidance" },
  @{ Path = "C:\Users\dhyey\OneDrive\Desktop\FinalNBs\PPTFINAL\MODULE2.2_ Dynamic Obstacle Avoidance.pptx"; Out = "C:\xLab\assets\slides\module2-dynamic-obstacle-avoidance" },
  @{ Path = "C:\Users\dhyey\OneDrive\Desktop\FinalNBs\PPTFINAL\MODULE3.1_ Learn to Win.pptx"; Out = "C:\xLab\assets\slides\module3-learn-to-win" },
  @{ Path = "C:\xLab\slides\Module 3.2_ ResidualRL.pptx"; Out = "C:\xLab\assets\slides\module3-residual-rl" }
)

$ppt = New-Object -ComObject PowerPoint.Application

foreach ($deck in $decks) {
  Write-Host "Processing $($deck.Path)"
  if (-not (Test-Path $deck.Out)) {
    New-Item -ItemType Directory -Path $deck.Out -Force | Out-Null
  }

  $pres = $ppt.Presentations.Open($deck.Path, [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)

  $slideWidth = $pres.PageSetup.SlideWidth
  $slideHeight = $pres.PageSetup.SlideHeight
  $scaleWidth = 1920
  $scaleHeight = [int]([math]::Round($scaleWidth * $slideHeight / $slideWidth))

  $count = $pres.Slides.Count
  for ($i = 1; $i -le $count; $i++) {
    $num = "{0:D3}" -f $i
    $outFile = Join-Path $deck.Out "slide-$num.png"
    $pres.Slides.Item($i).Export($outFile, "PNG", $scaleWidth, $scaleHeight)
    Write-Host "  exported $outFile"
  }

  $pres.Close()
}

$ppt.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
Write-Host "Done."
