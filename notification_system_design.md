# Notification System Design

## Stage 1

### REST APIs

GET /notifications

GET /notifications?limit=10

GET /notifications?type=Placement

PATCH /notifications/{id}/read

Response Example

{
  "id": "123",
  "type": "Placement",
  "message": "Amazon Interview Scheduled",
  "isRead": false,
  "createdAt": "2026-06-05T10:00:00Z"
}

### Real Time Notifications

Use WebSockets.

Flow:

1. Notification created.
2. Stored in database.
3. Published to WebSocket server.
4. Connected students receive notification instantly.
## Stage 3

Query:

SELECT *
FROM notifications
WHERE student_id = 1042
AND is_read = false
ORDER BY created_at DESC;

Why Slow?

- Full table scan
- 5 million notifications

Fix

CREATE INDEX idx_student_read_created
ON notifications(student_id,is_read,created_at DESC);

Cost

Without index:
O(N)

With index:
O(log N)

Placement query:

SELECT DISTINCT student_id
FROM notifications
WHERE notification_type='Placement'
AND created_at >= NOW() - INTERVAL '7 days';
## Stage 4

Performance Improvements

1. Redis Cache
2. Pagination
3. WebSockets
4. Read Replicas

Tradeoffs

Redis:
+ Fast
- Extra infrastructure

Read Replicas:
+ Less DB load
- Replication delay
## Stage 5

Problems in Current Design

- Sequential processing
- Slow
- Failure stops execution

Improved Design

1. Save notification to DB.
2. Publish message to queue.
3. Worker sends emails.
4. Worker pushes app notifications.

Tools

- RabbitMQ
- Kafka

Benefits

- Retry support
- Fault tolerance
- High throughput
## Stage 6

Priority Inbox

Priority Weight

Placement = 3
Result = 2
Event = 1

Priority Score

score = weight + recency factor

Implementation

Maintain a min heap of size 10.

When a new notification arrives:

- Compute score.
- Insert into heap.
- If heap size exceeds 10 remove minimum.

Complexity

Insertion: O(log 10)

Memory: O(10)