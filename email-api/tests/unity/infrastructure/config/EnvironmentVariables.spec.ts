import { describe, beforeEach, it, expect } from 'vitest';

import { EnvironmentVariables } from '../../../../src/infrastructure/config/EnvironmentVariables';

describe('EnvironmentVariables', () => {
  let envVariables: EnvironmentVariables;

  beforeEach(() => {
    envVariables = EnvironmentVariables.getInstance();
  });

  it('should retrieve database URL from environment variables', () => {
    expect(envVariables.getDatabaseURL()).toBeDefined();
  });

  it('should retrieve database user from environment variables', () => {
    expect(envVariables.getDatabaseUser()).toBeDefined();
  });

  it('should retrieve database password from environment variables', () => {
    expect(envVariables.getDatabasePassword()).toBeDefined();
  });

  it('should retrieve database host from environment variables', () => {
    expect(envVariables.getDatabaseHost()).toBeDefined();
  });

  it('should retrieve database port from environment variables', () => {
    expect(envVariables.getDatabasePort()).toBeDefined();
  });

  it('should retrieve mail host from environment variables', () => {
    expect(envVariables.getMailHost()).toBeDefined();
  });

  it('should retrieve mail port from environment variables', () => {
    expect(envVariables.getMailPort()).toBeDefined();
  });

  it('should retrieve mail user from environment variables', () => {
    expect(envVariables.getMailUser()).toBeDefined();
  });

  it('should retrieve mail from address from environment variables', () => {
    expect(envVariables.getMailFrom()).toBeDefined();
  });

  it('should retrieve mail password from environment variables', () => {
    expect(envVariables.getMailPassword()).toBeDefined();
  });

  it('should retrieve Node environment from environment variables', () => {
    expect(envVariables.getNodeEnv()).toBeDefined();
  });

  it('should retrieve secret key from environment variables', () => {
    expect(envVariables.getSecretKey()).toBeDefined();
  });

  it('should retrieve host IP address from environment variables or automatically detect it', () => {
    expect(envVariables.getHostIp()).toBeDefined();
  });

  it('should retrieve host port from environment variables or default to 3001', () => {
    expect(envVariables.getHostPort()).toBeDefined();
  });
});
