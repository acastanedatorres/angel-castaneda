<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

// Models Imports
use App\Models\Producto;
use App\Models\ProductoTraduccion;


class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $productos = Producto::get();
        return response()->json($productos);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            DB::transaction(function() use ($request) {
    
                $producto = new Producto();
        
                $producto->sku            = $request->sku;
                $producto->precio_dolares = $request->precio_dolares;
                $producto->precio_pesos   = $request->precio_pesos;
                $producto->puntos         = $request->puntos;
        
                $producto->save();
        
                foreach($request->traducciones as $traduccion) {
                    $productoTraduccion = new ProductoTraduccion();

                    $productoTraduccion->producto_id       = $producto->id;
                    $productoTraduccion->nombre            = $traduccion['nombre'];
                    $productoTraduccion->descripcion_corta = $traduccion['descripcion_corta'];
                    $productoTraduccion->descripcion_larga = $traduccion['descripcion_larga'];
                    $productoTraduccion->url               = Str::of($traduccion['idioma'] . " " .  $traduccion['nombre']  . " " . $producto->id )->slug('-');
                    $productoTraduccion->idioma            = $traduccion['idioma'];
                    
                    $productoTraduccion->save();
                }
            });
        } catch (\Throwable $th) {
            return response()->json([
                "message" => "error",
                "label"   => "Error al crear el producto",
                "payload" => $th
            ], 500);
        }

        return response()->json([
            "message" => "success",
            "label"   => "Producto creado",
            
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Producto::with('traducciones')->findOrFail($id);
        return response()->json($product);
    }
 

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Producto::findOrFail($id);
        
        $product->update($request->all());

        foreach($request->traducciones as $traduccion) {
            $productoTraduccion = ProductoTraduccion::find($traduccion['id']);
            $productoTraduccion->update($traduccion);
        }

        return response()->json(["message"=>"success", "response"=>"Producto actualizado"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $deleted = Producto::findOrFail($id)->delete();
        if($deleted) {
            return response()->json(["message"=>"success", "response"=>"Producto eliminado"]);    
        }
        return response()->json(["message"=>"error", "response"=>"Error al eliminar el producto"]);
    }
}
