// src/main/java/com/email/writer/app/EmailGeneratorController.java
package com.email.writer.app;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*") // Ye CORS ke liye hai, jo already sahi hai
public class EmailGeneratorController {
    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    // Ab hum ResponseEntity<String> ki jagah ResponseEntity<EmailResponse> return karenge
    public ResponseEntity<EmailResponse> generateEmail(@RequestBody EmailRequest emailRequest){
        // emailGeneratorService se generated reply string lo
        String generatedReplyContent = emailGeneratorService.generateEmailReply(emailRequest);

        // Is string ko EmailResponse object ke andar wrap karo
        EmailResponse response = new EmailResponse(generatedReplyContent);

        // Ab JSON object return karo
        return ResponseEntity.ok(response);
    }
}