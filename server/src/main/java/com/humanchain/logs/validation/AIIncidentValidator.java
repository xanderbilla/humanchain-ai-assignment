package com.humanchain.logs.validation;

import com.humanchain.logs.dto.AIIncidentCreateDTO;
import com.humanchain.logs.dto.AIIncidentDTO;
import com.humanchain.logs.model.AIIncident;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * Validator for AI Incident data.
 * Ensures that incident data meets the required validation rules before
 * processing.
 *
 * @author Vikas Singh
 * @since 1.0
 */
@Component
public class AIIncidentValidator {

    /**
     * Validates an AI Incident entity
     *
     * @param incident The incident to validate
     * @return ValidationResult containing the validation status and message
     */
    public ValidationResult validate(AIIncident incident) {
        if (incident == null) {
            return new ValidationResult(false, "Incident cannot be null");
        }

        if (!StringUtils.hasText(incident.getTitle())) {
            return new ValidationResult(false, "Title is required");
        }

        if (!StringUtils.hasText(incident.getDescription())) {
            return new ValidationResult(false, "Description is required");
        }

        if (incident.getSeverity() == null) {
            return new ValidationResult(false, "Severity is required");
        }

        return new ValidationResult(true, "Validation successful");
    }

    /**
     * Validates an AI Incident DTO
     *
     * @param dto The DTO to validate
     * @return ValidationResult containing the validation status and message
     */
    public ValidationResult validate(AIIncidentDTO dto) {
        if (dto == null) {
            return new ValidationResult(false, "Incident data cannot be null");
        }

        if (!StringUtils.hasText(dto.getTitle())) {
            return new ValidationResult(false, "Title is required");
        }

        if (!StringUtils.hasText(dto.getDescription())) {
            return new ValidationResult(false, "Description is required");
        }

        if (dto.getSeverity() == null) {
            return new ValidationResult(false, "Severity is required");
        }

        return new ValidationResult(true, "Validation successful");
    }

    /**
     * Validates an AI Incident Create DTO
     *
     * @param dto The create DTO to validate
     * @return ValidationResult containing the validation status and message
     */
    public ValidationResult validate(AIIncidentCreateDTO dto) {
        if (dto == null) {
            return new ValidationResult(false, "Incident data cannot be null");
        }

        if (!StringUtils.hasText(dto.getTitle())) {
            return new ValidationResult(false, "Title is required");
        }

        if (!StringUtils.hasText(dto.getDescription())) {
            return new ValidationResult(false, "Description is required");
        }

        if (dto.getSeverity() == null) {
            return new ValidationResult(false, "Severity is required");
        }

        // Validate severity enum
        try {
            AIIncident.Severity.valueOf(dto.getSeverity().name());
        } catch (IllegalArgumentException e) {
            String allowedValues = Arrays.stream(AIIncident.Severity.values())
                    .map(Enum::name)
                    .collect(Collectors.joining(", "));
            return new ValidationResult(false,
                    "Invalid severity value. Allowed values are: " + allowedValues);
        }

        return new ValidationResult(true, "Validation successful");
    }

    /**
     * Represents the result of a validation operation
     */
    public static class ValidationResult {
        private final boolean valid;
        private final String message;

        /**
         * Creates a new ValidationResult
         *
         * @param valid   Whether the validation was successful
         * @param message The validation message
         */
        public ValidationResult(boolean valid, String message) {
            this.valid = valid;
            this.message = message;
        }

        /**
         * Returns whether the validation was successful
         *
         * @return true if validation passed, false otherwise
         */
        public boolean isValid() {
            return valid;
        }

        /**
         * Returns the validation message
         *
         * @return The validation message
         */
        public String getMessage() {
            return message;
        }
    }
}