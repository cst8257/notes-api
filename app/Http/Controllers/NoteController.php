<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Auth::user()->notes, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $note = new Note();
        $note->title = $request->title;
        $note->text = $request->text;
        $note->user_id = Auth::id();
        $note->save();

        return response()->json($note, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        if (Auth::id() !== $note->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($note, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        if (Auth::id() !== $note->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $note->title = $request->title;
        $note->text = $request->text;
        $note->save();

        return response()->json($note, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        if (Auth::id() !== $note->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $note->delete();

        return response()->json($note);
    }
}
