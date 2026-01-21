package es.dariosevilla.impostor;

import android.os.Bundle;
import android.view.View;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Disable edge-to-edge to prevent status bar overlap
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
    }
}
