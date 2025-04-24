package com.humanchain.logs.dto;

import com.humanchain.logs.model.AIIncident;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Data Transfer Object (DTO) for AI Incident.
 * This class is used for transferring data between the controller and client,
 * providing a clean interface for API communication.
 *
 * @author Vikas Singh
 * @since 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AIIncidentDTO {
    /**
     * Unique identifier of the incident
     */
    private String id;

    /**
     * Title of the incident
     */
    private String title;

    /**
     * Detailed description of the incident
     */
    private String description;

    /**
     * Severity level of the incident
     */
    private AIIncident.Severity severity;

    /**
     * Timestamp when the incident was reported
     */
    private LocalDateTime reportedAt;

    /**
     * Converts an AIIncident entity to its DTO representation
     *
     * @param entity The AIIncident entity to convert
     * @return AIIncidentDTO representation of the entity
     */
    public static AIIncidentDTO fromEntity(AIIncident entity) {
        if (entity == null) {
            return null;
        }
        return new AIIncidentDTO(
                entity.getId().toHexString(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getSeverity(),
                entity.getReportedAt());
    }

    /**
     * Converts this DTO to an AIIncident entity
     *
     * @return AIIncident entity representation of this DTO
     */
    public AIIncident toEntity() {
        AIIncident entity = new AIIncident();
        entity.setTitle(this.title);
        entity.setDescription(this.description);
        entity.setSeverity(this.severity);
        entity.setReportedAt(this.reportedAt);
        return entity;
    }
}