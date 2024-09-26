@echo off
:: Iniciar el servidor con npm run dev
start /B npm run dev

:: Esperar unos segundos para que el servidor inicie
timeout /t 5 /nobreak >nul

:: Abrir el enlace del servidor en el navegador predeterminado (por defecto en http://localhost:3000)
start http://localhost:8080

:: Mantener la ventana abierta
pause