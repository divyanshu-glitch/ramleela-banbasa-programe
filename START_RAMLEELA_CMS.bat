@echo off
chcp 65001 >nul
title Shri Ramleela Committee, Banbasa - CMS
cd /d "%~dp0"

echo ======================================================================
echo    श्री रामलीला कमेटी, बनबसा — संग्रह प्रबंधन प्रणाली
echo    Shri Ramleela Committee, Banbasa - Collection Management System
echo ======================================================================
echo.
echo वेबसाइट प्रारंभ की जा रही है (Starting website at http://localhost:5173)...
echo.

start "" "http://localhost:5173"

python --version >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    python -m http.server 5173
    exit /b
)

if exist "%~dp0bin\node.exe" (
    "%~dp0bin\node.exe" -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let f=req.url==='/'?'index.html':decodeURIComponent(req.url.split('?')[0].slice(1));let p=path.join(process.cwd(),f);if(fs.existsSync(p)){let ext=path.extname(p);let ct={'html':'text/html','js':'text/javascript','css':'text/css','json':'application/json'}[ext.slice(1)]||'application/octet-stream';res.writeHead(200,{'Content-Type':ct});fs.createReadStream(p).pipe(res);}else{res.writeHead(404);res.end('Not Found');}}).listen(5173,()=>console.log('Server running at http://localhost:5173'));"
    exit /b
)

start "" "%~dp0index.html"
