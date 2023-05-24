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

    public function scopeOrderByName($query, $direction = 'asc')
    {
        $query->orderBy(ProductoTraduccion::select('nombre')
            ->whereColumn('producto_traducciones.producto_id', 'productos.id')
            ->latest()
            ->take(1),
            $direction
        );
    }

    public function scopeIdioma($query, $idioma = 'español', $name = null) {

        if($name) {
            $query->whereHas('traducciones', function($q) use($idioma, $name) {
                $q->where('nombre', 'LIKE', "%" . $name .  "%");
            });
        } else {
            $query->with(['traducciones' => function($q) use($idioma, $name) {
                $q->where('idioma', '=', $idioma);
            }]);
        }
    }


    public function scopeOrderByPrice($query, $order) {
        $query->orderBy("precio_dolares", $order)->orderBy("precio_pesos", $order);
    }
}
