<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'sku',
        'precio_dolares',
        'precio_pesos',
        'puntos',
        'activo'
    ];


    public function traducciones() {
        return $this->hasMany(ProductoTraduccion::class, 'producto_id');
    }
}
