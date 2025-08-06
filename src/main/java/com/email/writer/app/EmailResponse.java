// src/main/java/com/email/writer/app/EmailResponse.java
package com.email.writer.app;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Ye getters, setters, toString, equals, hashCode methods automatic bana dega
@AllArgsConstructor // Ye sabhi fields ke saath constructor bana dega
@NoArgsConstructor // Ye bina arguments wala constructor bana dega
public class EmailResponse {
    private String reply; // Ye woh 'reply' field hai jo frontend expect kar raha hai
}