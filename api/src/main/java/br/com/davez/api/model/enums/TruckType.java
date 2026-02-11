package br.com.davez.api.model.enums;

import lombok.Getter;

@Getter
public enum TruckType {
    TOCO("Toco"),
    LS("LS"),
    BITREM("Bitrem"),
    RODOTREM("Rodotrem");

    private String description;

    TruckType(String description) {
        this.description = description;
    }
}