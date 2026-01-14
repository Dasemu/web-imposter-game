#!/bin/bash
# Script de versionado de archivos estáticos
# Genera hashes basados en el contenido y actualiza referencias en HTML

set -e

echo "🚀 Iniciando versionado de archivos estáticos..."
echo ""

# Archivos a versionar
ASSETS=("script.js" "styles.css" "logo.png")
HTML_FILE="index.html"

# Función para generar hash MD5 de un archivo
generate_hash() {
    local file=$1
    md5sum "$file" | cut -c1-8
}

# Función para obtener el nombre versionado
get_versioned_name() {
    local file=$1
    local hash=$2
    local base="${file%.*}"
    local ext="${file##*.}"
    echo "${base}.${hash}.${ext}"
}

# Limpiar archivos versionados antiguos
echo "🗑️  Limpiando versiones antiguas..."
rm -f *.*.js *.*.css *.*.png 2>/dev/null || true
echo ""

# Crear backup del HTML
cp "$HTML_FILE" "${HTML_FILE}.bak"

# Versionar cada archivo
for asset in "${ASSETS[@]}"; do
    if [[ ! -f "$asset" ]]; then
        echo "⚠️  Advertencia: $asset no encontrado, saltando..."
        continue
    fi

    # Generar hash
    hash=$(generate_hash "$asset")
    versioned=$(get_versioned_name "$asset" "$hash")

    # Copiar archivo con versión
    echo "📦 Versionando: $asset → $versioned"
    cp "$asset" "$versioned"

    # Actualizar referencia en HTML
    case "$asset" in
        *.js)
            sed -i "s|src=\"${asset}\"|src=\"${versioned}\"|g" "$HTML_FILE"
            ;;
        *.css)
            sed -i "s|href=\"${asset}\"|href=\"${versioned}\"|g" "$HTML_FILE"
            ;;
        *.png)
            sed -i "s|href=\"${asset}\"|href=\"${versioned}\"|g" "$HTML_FILE"
            sed -i "s|src=\"${asset}\"|src=\"${versioned}\"|g" "$HTML_FILE"
            ;;
    esac

    echo "✏️  Actualizado: $asset → $versioned en $HTML_FILE"
    echo ""
done

# Limpiar backup
rm -f "${HTML_FILE}.bak"

echo "✅ Versionado completado exitosamente!"
echo ""
echo "📋 Archivos versionados:"
ls -1 *.*.{js,css,png} 2>/dev/null || echo "   (ninguno)"