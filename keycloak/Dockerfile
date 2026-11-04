# Cloud-ready Dockerfile for hosting ReactJav Keycloak on Railway, Render, Fly.io, or Cloud Run
FROM quay.io/keycloak/keycloak:26.0

# Copy pre-configured ReactJav School realm (roles: student, instructor, admin, super_admin)
COPY reactjav-school-realm.json /opt/keycloak/data/import/reactjav-school-realm.json

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_HTTP_ENABLED=true
ENV KC_HOSTNAME_STRICT=false
ENV KC_PROXY_HEADERS=xforwarded

EXPOSE 8080

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized", "--import-realm"]

