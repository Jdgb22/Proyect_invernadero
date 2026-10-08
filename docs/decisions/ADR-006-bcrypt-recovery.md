# ADR-006: bcrypt + recuperación con código de 6 dígitos (15 min)

## Status
Accepted

## Date
2026-09-08

## Context
Contraseñas nunca en texto plano; recuperación usable por operarios de campo (muchos con celular antes que email) sin montar un sistema de tokens con enlaces firmados.

## Decision
- Hash **bcrypt** (salt 10 rondas): registro, login (`compare`) y reset usan el mismo esquema; solo se aceptan hashes `$2a$/$2b$`.
- Recuperación en dos pasos con **código numérico de 6 dígitos, 15 min de validez** en `verification_token`: `forgot-password` (emite, invalida anteriores, envía email SMTP o SMS, responde destino enmascarado) → `reset-password` (verifica `expires > NOW()`, actualiza hash, borra token).

## Alternatives Considered

### Enlace firmado de un solo uso (24 h)
- Pros: un clic, estándar en apps de escritorio
- Cons: expira lento si se reenvía, peor UX en celulares básicos, exige página de aterrizaje con token en URL (logs/proxys lo exponen)
- Rejected: el código corto con ventana de 15 min minimiza la superficie y funciona por SMS

### argon2 en vez de bcrypt
- Pros: mejor resistencia GPU/ASIC
- Cons: sin soporte nativo en el stack actual; `bcryptjs` ya integrado y auditado en uso
- Rejected: el costo de migración no compensa para este perfil de amenaza; reevaluar con auditoría formal

### Preguntas secretas / reset por admin
- Pros: cero infraestructura de correo
- Cons: respuestas adivinables; dependencia humana y tiempos muertos en campo
- Rejected: inaceptable operativamente

## Consequences
- Discrepancia conocida: el cliente pide ≥ 8 caracteres pero el servidor valida ≥ 6 (unificar a 8 al endurecer).
- Sin SMTP configurado no hay envío real (`sent: false` + código en logs): el deploy exige `SMTP_USER/SMTP_PASS` (ver DEPLOYMENT.md).
- SMS depende del proveedor en `notifications.ts`; documentar el suyo al cambiarlo.
