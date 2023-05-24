<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductoTraduccion extends Model
{
    use HasFactory;

    protected $table = "producto_traducciones";

    protected $fillable = [
        "id",
        "nombre",
        "descripcion_corta",
        "descripcion_larga",
        "idioma"
    ];
}
