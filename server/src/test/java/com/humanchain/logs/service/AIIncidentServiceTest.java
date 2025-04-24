package com.humanchain.logs.service;

import com.humanchain.logs.config.TestMongoDBConfig;
import com.humanchain.logs.model.AIIncident;
import com.humanchain.logs.repository.AIIncidentRepository;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
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
 * Test class for AIIncidentService
 *
 * @author Vikas Singh
 * @since 1.0
 */
@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
@ContextConfiguration(classes = TestMongoDBConfig.class)
class AIIncidentServiceTest {

    @Mock
    private AIIncidentRepository repository;

    @InjectMocks
    private AIIncidentService service;

    private AIIncident testIncident;
    private ObjectId testId;

    @BeforeEach
    void setUp() {
        testId = new ObjectId();
        testIncident = new AIIncident();
        testIncident.setId(testId);
        testIncident.setTitle("Test Incident");
        testIncident.setDescription("Test Description");
        testIncident.setSeverity(AIIncident.Severity.HIGH);
        testIncident.setReportedAt(LocalDateTime.now());
    }

    @Test
    void getAllIncidents_ShouldReturnAllIncidents() {
        // Arrange
        List<AIIncident> expectedIncidents = Arrays.asList(testIncident);
        when(repository.findAll()).thenReturn(expectedIncidents);

        // Act
        List<AIIncident> actualIncidents = service.getAllIncidents();

        // Assert
        assertNotNull(actualIncidents);
        assertEquals(1, actualIncidents.size());
        assertEquals(testIncident, actualIncidents.get(0));
        verify(repository, times(1)).findAll();
    }

    @Test
    void getIncidentById_WithValidId_ShouldReturnIncident() {
        // Arrange
        when(repository.findById(testId)).thenReturn(Optional.of(testIncident));

        // Act
        Optional<AIIncident> result = service.getIncidentById(testId);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(testIncident, result.get());
        verify(repository, times(1)).findById(testId);
    }

    @Test
    void getIncidentById_WithInvalidId_ShouldReturnEmpty() {
        // Arrange
        ObjectId invalidId = new ObjectId();
        when(repository.findById(invalidId)).thenReturn(Optional.empty());

        // Act
        Optional<AIIncident> result = service.getIncidentById(invalidId);

        // Assert
        assertFalse(result.isPresent());
        verify(repository, times(1)).findById(invalidId);
    }

    @Test
    void createIncident_ShouldSaveAndReturnIncident() {
        // Arrange
        when(repository.save(any(AIIncident.class))).thenReturn(testIncident);

        // Act
        AIIncident result = service.createIncident(testIncident);

        // Assert
        assertNotNull(result);
        assertEquals(testIncident, result);
        verify(repository, times(1)).save(testIncident);
    }

    @Test
    void deleteIncident_ShouldCallRepositoryDelete() {
        // Act
        service.deleteIncident(testId);

        // Assert
        verify(repository, times(1)).deleteById(testId);
    }
}