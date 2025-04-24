package com.humanchain.logs.dto;

import com.humanchain.logs.model.AIIncident;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Data Transfer Object (DTO) for creating or updating AI Incidents.
 * This class is used for transferring data between the controller and client,
 * providing a clean interface for API communication without internal fields.
 *
 * @author Vikas Singh
 * @since 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AIIncidentCreateDTO {
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
     * Converts this DTO to an AIIncident entity
     *
     * @return AIIncident entity representation of this DTO
     */
    public AIIncident toEntity() {
        AIIncident entity = new AIIncident();
        entity.setTitle(this.title);
        entity.setDescription(this.description);
        entity.setSeverity(this.severity);
        return entity;
    }
}