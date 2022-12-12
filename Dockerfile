FROM WarehouseManagementSystem
COPY . /app
WORKDIR /app
CMD node app.js
