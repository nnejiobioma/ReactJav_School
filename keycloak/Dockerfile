# Cloud-ready Dockerfile for hosting ReactJav Keycloak on Render, Railway, Fly.io, or Cloud Run
FROM quay.io/keycloak/keycloak:26.0

# Copy pre-configured ReactJav School realm (roles: student, instructor, admin, super_admin)
# Wildcard pattern supports both root (.) and ./keycloak Docker build contexts on Render
COPY reactjav-school-realm.json* keycloak/reactjav-school-realm.json* /opt/keycloak/data/import/

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_HTTP_ENABLED=true
ENV KC_HTTP_PORT=8080
ENV PORT=8080
ENV KC_HOSTNAME_STRICT=false
ENV KC_PROXY_HEADERS=xforwarded
ENV KC_BOOTSTRAP_ADMIN_USERNAME=admin
ENV KC_BOOTSTRAP_ADMIN_PASSWORD=ReactJavAdmin2026!

EXPOSE 8080

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--import-realm"]
