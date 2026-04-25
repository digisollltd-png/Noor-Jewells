
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CouponController extends Controller
{
    /**
     * Validate a coupon code.
     */
    public function validateCoupon(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string',
            'subtotal' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid request data.'
            ], 400);
        }

        $coupon = Coupon::where('code', $request->code)
            ->where('is_active', true)
            ->where(function($query) {
                $query->whereNull('expires_at')
                      ->orWhere('expires_at', '>', now());
            })
            ->first();

        if (!$coupon) {
            return response()->json([
                'valid' => false,
                'message' => 'Coupon not found or expired.'
            ], 404);
        }

        if ($request->subtotal < $coupon->min_spend) {
            return response()->json([
                'valid' => false,
                'message' => "Minimum spend of \${$coupon->min_spend} required for this coupon."
            ], 422);
        }

        return response()->json([
            'valid' => true,
            'coupon' => [
                'code' => $coupon->code,
                'discount_type' => $coupon->discount_type,
                'value' => (float)$coupon->value,
                'min_spend' => (float)$coupon->min_spend
            ],
            'message' => 'Coupon applied successfully!'
        ]);
    }
}
