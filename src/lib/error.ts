export function extractErrorDetails(errorMessage: string) {
  console.log(errorMessage)

  const regex =/SQLITE_CONSTRAINT: SQLite error: (\w+) constraint failed: (\w+)\.(\w+)/

  const match = errorMessage.match(regex)

  if (match) {
    let [, errorName, table, column] = match

    if (errorName == 'UNIQUE') {
      errorName = 'Already exists'
    }

    return {
      table,
      column,
      errorName,
    }
  }

  return null
}