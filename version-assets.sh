#!/bin/bash
# Script de versionado de archivos estáticos
# Genera hashes basados en el contenido y actualiza referencias en HTML

set -e

echo "🚀 Iniciando versionado de archivos estáticos..."
echo ""

# Directorio de trabajo
WWW_DIR="www"

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
rm -f "$WWW_DIR"/*.*.js "$WWW_DIR"/*.*.css "$WWW_DIR"/*.*.png 2>/dev/null || true
echo ""

# Crear backup del HTML
cp "$WWW_DIR/$HTML_FILE" "$WWW_DIR/${HTML_FILE}.bak"

# Versionar cada archivo
for asset in "${ASSETS[@]}"; do
    asset_path="$WWW_DIR/$asset"

    if [[ ! -f "$asset_path" ]]; then
        echo "⚠️  Advertencia: $asset_path no encontrado, saltando..."
        continue
    fi

    # Generar hash
    hash=$(generate_hash "$asset_path")
    versioned=$(get_versioned_name "$asset" "$hash")
    versioned_path="$WWW_DIR/$versioned"

    # Copiar archivo con versión
    echo "📦 Versionando: $asset → $versioned"
    cp "$asset_path" "$versioned_path"

    # Obtener nombre base y extensión para el patrón
    base="${asset%.*}"
    ext="${asset##*.}"

    # Actualizar referencia en HTML (busca versión original o hasheada)
    case "$asset" in
        *.js)
            sed -i -E "s|src=\"${base}(\.[a-f0-9]{8})?\.${ext}\"|src=\"${versioned}\"|g" "$WWW_DIR/$HTML_FILE"
            ;;
        *.css)
            sed -i -E "s|href=\"${base}(\.[a-f0-9]{8})?\.${ext}\"|href=\"${versioned}\"|g" "$WWW_DIR/$HTML_FILE"
            ;;
        *.png)
            sed -i -E "s|href=\"${base}(\.[a-f0-9]{8})?\.${ext}\"|href=\"${versioned}\"|g" "$WWW_DIR/$HTML_FILE"
            sed -i -E "s|src=\"${base}(\.[a-f0-9]{8})?\.${ext}\"|src=\"${versioned}\"|g" "$WWW_DIR/$HTML_FILE"
            ;;
    esac

    echo "✏️  Actualizado: $asset → $versioned en $HTML_FILE"
    echo ""
done

# Limpiar backup
rm -f "$WWW_DIR/${HTML_FILE}.bak"

echo "✅ Versionado completado exitosamente!"
echo ""
echo "📋 Archivos versionados:"
ls -1 "$WWW_DIR"/*.*.{js,css,png} 2>/dev/null || echo "   (ninguno)"
