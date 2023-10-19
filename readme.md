# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run the following command for a development server:

```bash
ng serve
```

Then, navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Ensure you add `client_secret.json` and `tokens.json` into the `webserver` directory:

### client_secret.json

```json
{
   "client_id": "Your Client Key",
   "client_secret": "Your Client Secret"
}
```

### tokens.json

```json
{
   "access_token": null,
   "refresh_token": null
}
```

## Code scaffolding

Generate a new component with:

```bash
ng generate component component-name
```

You can also use various `ng generate` commands like `directive`, `pipe`, `service`, `class`, `guard`, `interface`, `enum`, `module`.

## Build

Build the project with:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Execute unit tests via [Karma](https://karma-runner.github.io) with:

```bash
ng test
```

## Running end-to-end tests

Execute end-to-end tests via your chosen platform with:

```bash
ng e2e
```

Note: To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

For more information on the Angular CLI, use:

```bash
ng help
```

Or visit the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
