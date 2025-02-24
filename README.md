# Challenge Adcap

## Instrucciones

### Instalar las dependencias
```sh
npm i
npm i styled-components @types/styled-components --legacy-peer-deps
```

### Instalar EAS (expo notifications)
```sh
npm install --global eas-cli
```

### Loguearse con Expo
```sh
eas login
```

### Configurar la build
```sh
eas build:configure
si da error de build indicando que no hay permisos, borrar archivo eas.json y projectId dentro de app.json
```

### Levantar proyecto
```sh
npm start
```

### package json
```sh
node v20.15.0
expo v52.0.37
