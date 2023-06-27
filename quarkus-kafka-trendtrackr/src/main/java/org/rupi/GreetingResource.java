package org.rupi;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.reactive.messaging.Channel;
import org.jboss.resteasy.reactive.RestSseElementType;
import org.reactivestreams.Publisher;

@Path("/prices")
public class GreetingResource {

    @Inject
    @Channel("converted-prices-internal-stream")
    Publisher<Double> prices;


    @GET
    @Produces(MediaType.SERVER_SENT_EVENTS)
    public Publisher<Double> hello() {
        return prices;
    }
}
