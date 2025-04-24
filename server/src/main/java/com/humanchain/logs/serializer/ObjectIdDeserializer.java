package com.humanchain.logs.serializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.bson.types.ObjectId;

import java.io.IOException;

/**
 * Custom deserializer for MongoDB ObjectId.
 * Converts hex string representation to ObjectId during JSON deserialization.
 *
 * @author Vikas Singh
 * @since 1.0
 */
public class ObjectIdDeserializer extends JsonDeserializer<ObjectId> {

    /**
     * Deserializes a hex string to an ObjectId
     *
     * @param p    The JsonParser containing the value to deserialize
     * @param ctxt The DeserializationContext
     * @return The deserialized ObjectId
     * @throws IOException if an I/O error occurs during deserialization
     */
    @Override
    public ObjectId deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String value = p.getValueAsString();
        return new ObjectId(value);
    }
}