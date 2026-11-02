import type { Model } from 'nitromelondb'
import { writer } from 'nitromelondb/decorators'

type LegacyFieldDecorator = (
  target: object,
  key: string,
  // legacy decorators receive the descriptor of the plain class field,
  // which can carry an initializer - a PropertyDescriptor in the ES
  // sense, widened
  descriptor: PropertyDescriptor & { initializer?: unknown },
) => PropertyDescriptor | void

// applies nitromelondb's legacy model decorators without decorator
// syntax - the babel pipeline (legacy decorators + class properties
// transforms) existed only for them. legacy decorators are plain
// (target, key, descriptor) functions, so applying their returned
// descriptor via defineProperty is exactly what the babel transform
// emitted. @lazy properties are hand-written getters in dbModel instead
export const modelDecorators = (
  modelClass: typeof Model,
  fields: Record<string, LegacyFieldDecorator>,
  writers: string[] = [],
) => {
  const target = modelClass.prototype as unknown as Record<string, unknown>
  for (const [key, decorate] of Object.entries(fields)) {
    // nitromelondb's ensureDecoratorUsedProperly requires an initializer
    // key to be present (its value may be undefined)
    const descriptor = decorate(target, key, {
      initializer: undefined,
      configurable: true,
      enumerable: true,
      writable: true,
    })
    if (descriptor) {
      Object.defineProperty(target, key, descriptor)
    }
  }
  for (const key of writers) {
    const original = target[key] as (...args: unknown[]) => unknown
    const wrapped = writer(target, key, {
      value: original,
      writable: true,
      enumerable: false,
      configurable: true,
    })
    if (wrapped) {
      Object.defineProperty(target, key, {
        ...wrapped,
        enumerable: false,
        configurable: true,
        writable: true,
      })
    }
  }
}
