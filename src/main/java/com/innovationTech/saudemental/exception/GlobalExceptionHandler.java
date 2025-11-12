package com.innovationTech.saudemental.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,Object> handleValidation(MethodArgumentNotValidException ex){
        Map<String,Object> body = new LinkedHashMap<>();
        body.put("status", 400);
        body.put("errors", ex.getBindingResult().getFieldErrors()
                .stream().map(fe -> Map.of("field", fe.getField(), "message", fe.getDefaultMessage()))
                .toList());
        return body;
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,Object> handleIllegalArgument(IllegalArgumentException ex){
        return Map.of("status",400,"error",ex.getMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,Object> handleNotFound(NotFoundException ex){
        return Map.of("status",404,"error",ex.getMessage());
    }
}
