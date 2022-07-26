import { Resolvable, resolve } from ".."
import { AssertType } from "@thesunny/assert-type"

describe("resolvable-value", () => {
  describe("resolve", () => {
    it("should resolve a simple value", async () => {
      const x = await resolve("abc")
      AssertType.Equal<typeof x, string>(true)
      expect(x).toEqual("abc")
    })

    it("should resolve a promise value", async () => {
      const x = await resolve(
        new Promise<string>((resolve) => {
          resolve("abc")
        })
      )
      AssertType.Equal<typeof x, string>(true)
      expect(x).toEqual("abc")
    })

    it("should resolve a function", async () => {
      const x = await resolve(() => "abc")
      AssertType.Equal<typeof x, string>(true)
      expect(x).toEqual("abc")
    })

    it("should resolve an async function", async () => {
      const x = await resolve(async () => "abc")
      AssertType.Equal<typeof x, string>(true)
      expect(x).toEqual("abc")
    })
  })

  describe("Resolvable", () => {
    it("should match Resolvable", async () => {
      type ResolvableString = Resolvable<string>
      const value = "abc"
      const promiseValue = new Promise<string>((resolve) => resolve("abc"))
      const fn = () => "abc"
      const asyncFn = async () => "abc"
      AssertType.Extends<typeof value, ResolvableString>(true)
      AssertType.Extends<typeof promiseValue, ResolvableString>(true)
      AssertType.Extends<typeof fn, ResolvableString>(true)
      AssertType.Extends<typeof asyncFn, ResolvableString>(true)
    })
  })
})
