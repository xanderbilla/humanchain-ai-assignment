package com.humanchain.logs.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

/**
 * Generic API response wrapper class that standardizes the response format
 * for all API endpoints. This class ensures consistent response structure
 * across the application.
 *
 * @author Vikas Singh
 * @since 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    /**
     * Indicates whether the request was successful
     */
    private boolean success;

    /**
     * Descriptive message about the operation result
     */
    private String message;

    /**
     * The actual data payload of the response
     */
    private T data;

    /**
     * Timestamp of when the response was generated
     */
    private LocalDateTime timestamp;

    /**
     * Status of the operation (SUCCESS, ERROR, NOT_FOUND)
     */
    private String status;

    /**
     * Creates a successful response with data and message
     *
     * @param data    The data to be included in the response
     * @param message Descriptive message about the success
     * @return ApiResponse instance with success status
     */
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, message, data, LocalDateTime.now(), "SUCCESS");
    }

    /**
     * Creates an error response with message
     *
     * @param message Descriptive error message
     * @return ApiResponse instance with error status
     */
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(true, message, null, LocalDateTime.now(), "ERROR");
    }

    /**
     * Creates a not found response with message
     *
     * @param message Descriptive message about the resource not being found
     * @return ApiResponse instance with not found status
     */
    public static <T> ApiResponse<T> notFound(String message) {
        return new ApiResponse<>(true, message, null, LocalDateTime.now(), "NOT_FOUND");
    }
}