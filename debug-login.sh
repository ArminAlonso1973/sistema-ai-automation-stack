#!/bin/bash

echo "🔍 VERIFICANDO COMPONENTES - BUSCANDO LOGIN/AUTH"
echo "==============================================="

cd /Users/arminpalma/Documents/MacBookPro_Armin/Sistema_AI_automation_stack/frontend

echo "1. Verificando Layout.jsx:"
echo "------------------------"
grep -n -A 5 -B 5 "cliente\|login\|auth\|acceder\|Acceder" src/components/Layout.jsx || echo "No encontrado en Layout"

echo ""
echo "2. Verificando Dashboard.jsx:"
echo "---------------------------"
grep -n -A 5 -B 5 "cliente\|login\|auth\|acceder\|Acceder" src/pages/Dashboard.jsx || echo "No encontrado en Dashboard"

echo ""
echo "3. Verificando todos los archivos jsx por 'ID del Cliente':"
echo "---------------------------------------------------------"
grep -r -n "ID del Cliente\|cliente para acceder" src/ || echo "No encontrado"

echo ""
echo "4. Verificando todos los archivos jsx por 'Acceder':"
echo "---------------------------------------------------"
grep -r -n "Acceder" src/ || echo "No encontrado"

echo ""
echo "5. Listando TODOS los componentes:"
echo "--------------------------------"
find src/ -name "*.jsx" -type f

echo ""
echo "6. Mostrando contenido completo de Layout.jsx:"
echo "--------------------------------------------"
head -30 src/components/Layout.jsx