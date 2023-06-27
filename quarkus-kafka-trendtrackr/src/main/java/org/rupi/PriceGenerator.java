package org.rupi;

import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.reactive.messaging.Outgoing;

import java.time.Duration;
import java.util.Random;

@ApplicationScoped
public class PriceGenerator {

    private final Random random = new Random();

    @Outgoing("generated-price")
    public Multi<Integer> generate() {
        return Multi.createFrom().ticks().every(Duration.ofMillis(1))
                .onOverflow().drop()
                .map(tick -> random.nextInt(100));
    }
}
