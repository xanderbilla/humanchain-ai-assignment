package com.humanchain.logs;

import com.humanchain.logs.config.TestMongoDBConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ActiveProfiles("test")
@ContextConfiguration(classes = TestMongoDBConfig.class)
class LogsApplicationTests {

	@Test
	void contextLoads() {
	}

}
