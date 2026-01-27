import { DefaultNamingStrategy } from './DefaultNamingStrategy';

export class ArrayNamingStrategy extends DefaultNamingStrategy {
  // Inherits generateKey from DefaultNamingStrategy
  // The magic happens in the adapters which will return a single array value
  // when they detect this strategy in the context.
}
