<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class ReportController extends Controller
{
    // Constructor to add middleware to relevant methods
    // public function __construct()
    // {
    //     $this->middleware('auth:sanctum');
    // }

    // List all reports
    public function index()
    {
        $reports = Report::all();

        return response()->json($reports);
    }


    // Store a new report
    public function store(Request $request)
{
    // $request->validate([
    //     'post_id' => 'required|exists:posts,id',
    //     'reason' => 'required|string',
    // ]);
    

    $report = Report::create([
        // 'reported_by_id' => auth()->id(),
        'reported_by_id' => 2,
        'post_id' => $request->post_id,
        'reason' => $request->reason,
        'status' => 'Pending' // Default status
    ]);

    return response()->json($report, 201);
}
    // Show a specific report
    public function show(Report $report)
{
    return response()->json($report);
}


    // Update a report
    public function update(Request $request, Report $report)
{
    $request->validate([
        'status' => 'required|in:Pending,Reviewed,Resolved'
    ]);

    $report->update(['status' => $request->status]);

    return response()->json($report);
}


    // Delete a report
    public function destroy(Report $report)
{
    $report->delete();

    return response()->json(null, 204);
}

}
