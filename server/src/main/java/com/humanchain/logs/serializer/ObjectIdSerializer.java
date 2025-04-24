package com.humanchain.logs.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.bson.types.ObjectId;

import java.io.IOException;

/**
 * Custom serializer for MongoDB ObjectId.
 * Converts ObjectId to its hex string representation during JSON serialization.
 *
 * @author Vikas Singh
 * @since 1.0
 */
public class ObjectIdSerializer extends JsonSerializer<ObjectId> {

    /**
     * Serializes an ObjectId to its hex string representation
     *
     * @param value       The ObjectId to serialize
     * @param gen         The JsonGenerator to write the serialized value
     * @param serializers The SerializerProvider
     * @throws IOException if an I/O error occurs during serialization
     */
    @Override
    public void serialize(ObjectId value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeString(value.toHexString());
    }
}