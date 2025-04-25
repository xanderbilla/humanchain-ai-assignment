package com.humanchain.logs.controller;

import com.humanchain.logs.config.TestMongoDBConfig;
import com.humanchain.logs.dto.AIIncidentCreateDTO;
import com.humanchain.logs.dto.AIIncidentDTO;
import com.humanchain.logs.model.AIIncident;
import com.humanchain.logs.model.ApiResponse;
import com.humanchain.logs.service.AIIncidentService;
import com.humanchain.logs.validation.AIIncidentValidator;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Test class for AIIncidentController
 *
 * @author Vikas Singh
 * @since 1.0
 */
@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@ContextConfiguration(classes = TestMongoDBConfig.class)
class AIIncidentControllerTest {

    @Mock
    private AIIncidentService service;

    @Mock
    private AIIncidentValidator validator;

    @InjectMocks
    private AIIncidentController controller;

    private AIIncident testIncident;
    private AIIncidentDTO testIncidentDTO;
    private AIIncidentCreateDTO testIncidentCreateDTO;
    private ObjectId testId;
    private String testIdString;

    @BeforeEach
    void setUp() {
        testId = new ObjectId();
        testIdString = testId.toHexString();

        testIncident = new AIIncident();
        testIncident.setId(testId);
        testIncident.setTitle("Test Incident");
        testIncident.setDescription("Test Description");
        testIncident.setSeverity(AIIncident.Severity.HIGH);
        testIncident.setReportedAt(LocalDateTime.now());

        testIncidentDTO = AIIncidentDTO.fromEntity(testIncident);

        testIncidentCreateDTO = new AIIncidentCreateDTO();
        testIncidentCreateDTO.setTitle("Test Incident");
        testIncidentCreateDTO.setDescription("Test Description");
        testIncidentCreateDTO.setSeverity(AIIncident.Severity.HIGH);
    }

    @Test
    void getAllIncidents_ShouldReturnListOfIncidents() {
        // Arrange
        List<AIIncident> incidents = Arrays.asList(testIncident);
        when(service.getAllIncidents()).thenReturn(incidents);

        // Act
        ResponseEntity<ApiResponse<List<AIIncidentDTO>>> response = controller.getAllIncidents();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals(1, response.getBody().getData().size());
        assertEquals(testIncidentDTO, response.getBody().getData().get(0));
    }

    @Test
    void getAllIncidents_WhenEmpty_ShouldReturnEmptyList() {
        // Arrange
        when(service.getAllIncidents()).thenReturn(List.of());

        // Act
        ResponseEntity<ApiResponse<List<AIIncidentDTO>>> response = controller.getAllIncidents();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertTrue(response.getBody().getData().isEmpty());
    }

    @Test
    void getIncidentById_WithValidId_ShouldReturnIncident() {
        // Arrange
        when(service.getIncidentById(testId)).thenReturn(Optional.of(testIncident));

        // Act
        ResponseEntity<ApiResponse<AIIncidentDTO>> response = controller.getIncidentById(testIdString);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals(testIncidentDTO, response.getBody().getData());
    }

    @Test
    void getIncidentById_WithInvalidId_ShouldReturnNotFound() {
        // Arrange
        when(service.getIncidentById(testId)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<ApiResponse<AIIncidentDTO>> response = controller.getIncidentById(testIdString);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertNull(response.getBody().getData());
    }

    @Test
    void getIncidentById_WithInvalidFormat_ShouldReturnBadRequest() {
        // Act
        ResponseEntity<ApiResponse<AIIncidentDTO>> response = controller.getIncidentById("invalid-id");

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertNull(response.getBody().getData());
    }

    @Test
    void createIncident_WithValidData_ShouldCreateIncident() {
        // Arrange
        when(validator.validate(any(AIIncidentCreateDTO.class)))
                .thenReturn(new AIIncidentValidator.ValidationResult(true, "Validation successful"));
        when(service.createIncident(any())).thenReturn(testIncident);

        // Act
        ResponseEntity<ApiResponse<String>> response = controller.createIncident(testIncidentCreateDTO);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals(testIdString, response.getBody().getData());
    }

    @Test
    void createIncident_WithInvalidData_ShouldReturnBadRequest() {
        // Arrange
        when(validator.validate(any(AIIncidentCreateDTO.class)))
                .thenReturn(new AIIncidentValidator.ValidationResult(false, "Title is required"));

        // Act
        ResponseEntity<ApiResponse<String>> response = controller.createIncident(testIncidentCreateDTO);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("Title is required", response.getBody().getMessage());
    }

    @Test
    void deleteIncident_WithValidId_ShouldDeleteIncident() {
        // Arrange
        when(service.getIncidentById(testId)).thenReturn(Optional.of(testIncident));
        doNothing().when(service).deleteIncident(testId);

        // Act
        ResponseEntity<ApiResponse<String>> response = controller.deleteIncident(testIdString);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals(testIdString, response.getBody().getData());
    }

    @Test
    void deleteIncident_WithInvalidId_ShouldReturnNotFound() {
        // Arrange
        when(service.getIncidentById(testId)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<ApiResponse<String>> response = controller.deleteIncident(testIdString);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("Cannot delete, no incident found with id: " + testIdString, response.getBody().getMessage());
    }

    @Test
    void deleteIncident_WithInvalidFormat_ShouldReturnBadRequest() {
        // Act
        ResponseEntity<ApiResponse<String>> response = controller.deleteIncident("invalid-id");

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertTrue(response.getBody().isSuccess());
        assertEquals("Invalid ID format. Please provide a valid MongoDB ObjectId", response.getBody().getMessage());
    }
}