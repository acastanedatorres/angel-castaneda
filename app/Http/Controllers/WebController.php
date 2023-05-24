<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use App\Models\ProductoTraduccion;

class WebController extends Controller
{
    public function index(Request $request) {
        $query = Producto::query();
        // $query->with('traducciones');
        $query->with('traducciones');

        $query->where('activo', 1);

        $query->when($request->sku != "", function($query) use($request) {
            $query->where('sku', '=', $request->sku);
        });
        
        $query->when($request->order_by = "nombre", function($q) use($request) {
            $q->orderByName($request->direction);
        });

        $query->when($request->order_by = "precio", function($q) use($request) {
            $q->orderByPrice($request->direction);
        });

        $query->idioma($request->idioma, $request->name);
    
       

        return response()->json($query->get());
    }

    public function details($id) {
        $query = Producto::with(['traducciones' => function($q) use ($id) {
            $q->where('url', '=' , $id);
        }])->whereHas('traducciones', function($q) use ($id) {
            $q->where('url', '=' , $id);
        });

        return $query->first();
    }
}
