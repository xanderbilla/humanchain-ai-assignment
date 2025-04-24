package com.humanchain.logs.config;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoDBConfig {

    private static final Logger logger = LoggerFactory.getLogger(MongoDBConfig.class);

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Bean
    public MongoClient mongoClient() {
        try {
            MongoClient client = MongoClients.create(mongoUri);
            // Test the connection
            client.listDatabaseNames().first();
            logger.info("MongoDB connected successfully!");
            return client;
        } catch (MongoException e) {
            logger.error("MongoDB failed to connect due to - {}", e.getMessage());
            logger.error("Exiting...");
            System.exit(1);
            return null;
        }
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongoClient) {
        return new MongoTemplate(mongoClient, "logs");
    }
} 