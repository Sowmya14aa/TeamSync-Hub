$url = "http://localhost:8080/api/auth/login"
$body = @{ username="testuser"; password="password123" } | ConvertTo-Json
$duration = 15
$startTime = Get-Date
$requestCount = 0

Write-Host "Starting Load Test for $duration seconds..." -ForegroundColor Cyan

while ((Get-Date) -lt $startTime.AddSeconds($duration)) {
    try {
        Invoke-RestMethod -Uri $url -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop > $null
        $requestCount++
    } catch {
        Write-Host "Request failed" -ForegroundColor Red
    }
}

$rps = [math]::Round($requestCount / $duration, 2)
Write-Host "`n--- TEST RESULTS ---" -ForegroundColor Green
Write-Host "Total Requests: $requestCount"
Write-Host "Test Duration: $duration seconds"
Write-Host "Requests Per Second (RPS): $rps"
