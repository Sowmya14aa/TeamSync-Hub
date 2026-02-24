$url = "http://localhost:8080/api/auth/login"
# IMPORTANT: Use a username/password that actually exists in your DB!
$body = @{ username="testuser"; password="password123" } | ConvertTo-Json
$duration = 5
$startTime = Get-Date
$requestCount = 0

Write-Host "Starting Debug Load Test for $duration seconds..." -ForegroundColor Cyan

while ((Get-Date) -lt $startTime.AddSeconds($duration)) {
    try {
        $response = Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
        $requestCount++
        Write-Host "Success ($requestCount)" -ForegroundColor Green
    } catch {
        # This catches the EXACT error from the server
        $statusCode = $_.Exception.Response.StatusCode.value__
        $errorMsg = $_.Exception.Message
        Write-Host "Failed: Status [$statusCode] - $errorMsg" -ForegroundColor Red
        break # Stops after one failure so you can read the error
    }
    Start-Sleep -Milliseconds 200 # Adds a small delay to prevent security blocks
}

$rps = [math]::Round($requestCount / $duration, 2)
Write-Host "`nRequests Per Second (RPS): $rps" -ForegroundColor Yellow
