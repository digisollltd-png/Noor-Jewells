
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coupons', function (Blueprint $row) {
            $row->id();
            $row->string('code')->unique();
            $row->enum('discount_type', ['fixed', 'percentage'])->default('percentage');
            $row->decimal('value', 10, 2);
            $row->decimal('min_spend', 10, 2)->default(0);
            $row->dateTime('expires_at')->nullable();
            $row->boolean('is_active')->default(true);
            $row->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
