<?php

namespace App\Http\Controllers;

use App\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param.$request \Illuminate\Http\Request
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $item = new Item(
            [
                'name' => $request->get('name'),
                'price' => $request->get('price'),
            ]
        );
        $item->save();
        return response()->json('Successfully added');
    }
}
