package com.humanchain.logs.controller;

import com.humanchain.logs.model.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Controller for health check endpoint.
 *
 * @author Vikas Singh
 * @since 1.0
 */
@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, String>>> healthCheck() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(
                        Map.of("status", "UP"),
                        "Service is healthy"));
    }
}