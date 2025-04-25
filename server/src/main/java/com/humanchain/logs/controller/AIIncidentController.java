package com.humanchain.logs.controller;

import com.humanchain.logs.dto.AIIncidentCreateDTO;
import com.humanchain.logs.dto.AIIncidentDTO;
import com.humanchain.logs.model.AIIncident;
import com.humanchain.logs.model.ApiResponse;
import com.humanchain.logs.service.AIIncidentService;
import com.humanchain.logs.validation.AIIncidentValidator;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST Controller for managing AI Incidents.
 * Provides endpoints for CRUD operations on AI incidents.
 *
 * @author Vikas Singh
 * @since 1.0
 */
@RestController
@RequestMapping("/incidents")
public class AIIncidentController {

    private static final Logger logger = LoggerFactory.getLogger(AIIncidentController.class);
    private final AIIncidentService service;
    private final AIIncidentValidator validator;

    /**
     * Constructs a new AIIncidentController with required dependencies
     *
     * @param service   The service layer for AI incident operations
     * @param validator The validator for AI incident data
     */
    public AIIncidentController(AIIncidentService service, AIIncidentValidator validator) {
        this.service = service;
        this.validator = validator;
    }

    /**
     * Retrieves all AI incidents from the database
     *
     * @return ResponseEntity containing a list of all incidents or an empty list
     *         with appropriate message
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<AIIncidentDTO>>> getAllIncidents() {
        logger.info("Fetching all incidents");
        List<AIIncident> incidents = service.getAllIncidents();

        if (incidents.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(List.of(), "No incidents found in the database"));
        }

        List<AIIncidentDTO> dtos = incidents.stream()
                .map(AIIncidentDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(dtos, "Successfully retrieved all incidents"));
    }

    /**
     * Retrieves a specific incident by its ID
     *
     * @param id The ID of the incident to retrieve
     * @return ResponseEntity containing the incident if found, or appropriate error
     *         message
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AIIncidentDTO>> getIncidentById(@PathVariable String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            Optional<AIIncident> incident = service.getIncidentById(objectId);

            if (incident.isEmpty()) {
                logger.warn("Incident not found with id: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notFound("No incident found with id: " + id));
            }

            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(
                            AIIncidentDTO.fromEntity(incident.get()),
                            "Successfully retrieved incident"));
        } catch (IllegalArgumentException e) {
            logger.error("Invalid ObjectId format: {}", id);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Invalid ID format. Please provide a valid MongoDB ObjectId"));
        }
    }

    /**
     * Creates a new AI incident
     *
     * @param incidentDTO The incident data to create
     * @return ResponseEntity containing the created incident or validation error
     *         message
     */
    @PostMapping
    public ResponseEntity<ApiResponse<String>> createIncident(@RequestBody AIIncidentCreateDTO incidentDTO) {
        var validationResult = validator.validate(incidentDTO);
        if (!validationResult.isValid()) {
            logger.warn("Validation failed: {}", validationResult.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(validationResult.getMessage()));
        }

        try {
            AIIncident incident = incidentDTO.toEntity();
            AIIncident createdIncident = service.createIncident(incident);
            String incidentId = createdIncident.getId().toHexString();
            logger.info("Created incident with id: {}", incidentId);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(incidentId, "Incident created successfully with id: " + incidentId));
        } catch (IllegalArgumentException e) {
            logger.error("Invalid severity value: {}", incidentDTO.getSeverity());
            String allowedValues = Arrays.stream(AIIncident.Severity.values())
                    .map(Enum::name)
                    .collect(Collectors.joining(", "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Invalid severity value. Allowed values are: " + allowedValues));
        }
    }

    /**
     * Exception handler for JSON parsing errors
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<String>> handleHttpMessageNotReadableException(
            HttpMessageNotReadableException ex) {
        logger.error("JSON parsing error: {}", ex.getMessage());

        if (ex.getMessage() != null && ex.getMessage()
                .contains("Cannot deserialize value of type `com.humanchain.logs.model.AIIncident$Severity`")) {
            String allowedValues = Arrays.stream(AIIncident.Severity.values())
                    .map(Enum::name)
                    .collect(Collectors.joining(", "));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Invalid severity value. Allowed values are: " + allowedValues));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("Invalid request format: " + ex.getMessage()));
    }

    /**
     * Deletes an incident by its ID
     *
     * @param id The ID of the incident to delete
     * @return ResponseEntity with success message or appropriate error message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteIncident(@PathVariable String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            Optional<AIIncident> existingIncident = service.getIncidentById(objectId);

            if (existingIncident.isEmpty()) {
                logger.warn("Attempted to delete non-existent incident with id: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.notFound("Cannot delete, no incident found with id: " + id));
            }

            service.deleteIncident(objectId);
            logger.info("Deleted incident with id: {}", id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(ApiResponse.success(id, "Incident deleted successfully with id: " + id));
        } catch (IllegalArgumentException e) {
            logger.error("Invalid ObjectId format: {}", id);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Invalid ID format. Please provide a valid MongoDB ObjectId"));
        }
    }
}