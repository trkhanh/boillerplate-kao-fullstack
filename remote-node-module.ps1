<# 
Note: Eliminate `-WhatIf` parameter to get action be actually done 
Note: PS with version prior to 4.0 can't delete non-empty folders
#>

Get-ChildItem -Path "." -Include "node_modules" -Recurse -Directory | Remove-Item -Recurse -Force -WhatIf