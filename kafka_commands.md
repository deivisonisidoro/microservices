# Kafka Commands

**Observation:** If Kafka is running on Docker, you may need to access the container using the command `docker exec -it <container_id> /bin/bash` to run Kafka commands. Additionally, when running Kafka in Docker, remember to omit the ".sh" suffix when executing Kafka commands.

1. **Start Zookeeper:** (if not already running, as Kafka typically depends on it)
   ```bash
   zookeeper-server-start config/zookeeper.properties
   ```
2. **Start Kafka Server::**
   ```bash
   kafka-server-start config/server.properties
   ```
3. **Create a New Topic:**
   ```bash
   kafka-topics --create --topic my-topic --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1
   ```
4. **List All Topics:**
   ```bash
   kafka-topics --list --bootstrap-server localhost:9092
   ```
5. **Describe a Topic:**
   ```bash
   kafka-topics --describe --topic my-topic --bootstrap-server localhost:9092
   ```
6. **Produce Messages to a Topic:**
   ```bash
   kafka-console-producer --topic my-topic --bootstrap-server localhost:9092
   ```
7. **Consume Messages from a Topic:**
   ```bash
   kafka-console-consumer --topic my-topic --bootstrap-server localhost:9092 --from-beginning
   ```
8. **Consume Messages from a Topic with Specific Consumer Group:**
   ```bash
   kafka-console-consumer --topic my-topic --bootstrap-server localhost:9092 --group my-group
   ```
9. **List Consumer Groups:**
   ```bash
   kafka-consumer-groups --list --bootstrap-server localhost:9092
   ```
10. **Describe Consumer Group:**
   ```bash
   kafka-consumer-groups --describe --group my-group --bootstrap-server localhost:9092
   ```